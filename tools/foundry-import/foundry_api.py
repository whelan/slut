"""Foundry VTT API client for batch importing content."""

import os
import time
from typing import Any, Dict, List, Optional
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


class FoundryAPIClient:
    """Client for Foundry VTT (forgevtt) REST API."""

    def __init__(
        self,
        foundry_url: str,
        api_key: str,
        world_id: str,
        timeout: int = 30,
        max_retries: int = 3,
    ):
        """Initialize Foundry API client.

        Args:
            foundry_url: Base URL (e.g., https://forgevtt.com)
            api_key: Foundry API key (from forgevtt dashboard)
            world_id: Target world ID
            timeout: Request timeout in seconds
            max_retries: Number of retries for failed requests
        """
        self.foundry_url = foundry_url.rstrip('/')
        self.api_key = api_key
        self.world_id = world_id
        self.timeout = timeout
        self.max_retries = max_retries

        # Configure session with retries
        self.session = requests.Session()
        retry_strategy = Retry(
            total=max_retries,
            backoff_factor=1,
            status_forcelist=[429, 500, 502, 503, 504],
        )
        adapter = HTTPAdapter(max_retries=retry_strategy)
        self.session.mount('http://', adapter)
        self.session.mount('https://', adapter)

        # Set auth header
        self.session.headers.update({
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        })

        self.import_log = {
            'actors': [],
            'journals': [],
            'scenes': [],
            'errors': [],
        }

    def _make_request(
        self,
        method: str,
        endpoint: str,
        data: Optional[Dict[str, Any]] = None,
        params: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """Make HTTP request to Foundry API.

        Args:
            method: HTTP method (GET, POST, PATCH, DELETE)
            endpoint: API endpoint (relative to base URL)
            data: Request body (JSON)
            params: Query parameters

        Returns:
            Response JSON
        """
        url = f'{self.foundry_url}/api{endpoint}'

        try:
            if method == 'GET':
                response = self.session.get(url, params=params, timeout=self.timeout)
            elif method == 'POST':
                response = self.session.post(url, json=data, params=params, timeout=self.timeout)
            elif method == 'PATCH':
                response = self.session.patch(url, json=data, params=params, timeout=self.timeout)
            elif method == 'DELETE':
                response = self.session.delete(url, timeout=self.timeout)
            else:
                raise ValueError(f"Unsupported HTTP method: {method}")

            response.raise_for_status()
            return response.json() if response.content else {}

        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"API request failed: {e}")

    def test_connection(self) -> bool:
        """Test API connection and authentication."""
        try:
            response = self._make_request('GET', '/worlds')
            return bool(response)
        except Exception as e:
            print(f"Connection test failed: {e}")
            return False

    def create_actor(self, actor_data: Dict[str, Any]) -> Optional[str]:
        """Create an actor in the world.

        Args:
            actor_data: Actor JSON (name, type, img, system, items, effects)

        Returns:
            Actor ID if successful, None otherwise
        """
        try:
            response = self._make_request('POST', f'/worlds/{self.world_id}/actors', actor_data)
            actor_id = response.get('id') or response.get('_id')
            if actor_id:
                self.import_log['actors'].append({
                    'name': actor_data['name'],
                    'id': actor_id,
                    'status': 'created',
                })
            return actor_id
        except Exception as e:
            error_msg = f"Failed to create actor '{actor_data['name']}': {e}"
            self.import_log['errors'].append(error_msg)
            print(error_msg)
            return None

    def create_journal(self, journal_data: Dict[str, Any]) -> Optional[str]:
        """Create a journal entry in the world.

        Args:
            journal_data: Journal JSON (name, pages, content)

        Returns:
            Journal ID if successful, None otherwise
        """
        try:
            response = self._make_request('POST', f'/worlds/{self.world_id}/journals', journal_data)
            journal_id = response.get('id') or response.get('_id')
            if journal_id:
                self.import_log['journals'].append({
                    'name': journal_data['name'],
                    'id': journal_id,
                    'status': 'created',
                })
            return journal_id
        except Exception as e:
            error_msg = f"Failed to create journal '{journal_data['name']}': {e}"
            self.import_log['errors'].append(error_msg)
            print(error_msg)
            return None

    def create_scene(self, scene_data: Dict[str, Any]) -> Optional[str]:
        """Create a scene in the world.

        Args:
            scene_data: Scene JSON (name, background, width, height, grid, etc.)

        Returns:
            Scene ID if successful, None otherwise
        """
        try:
            response = self._make_request('POST', f'/worlds/{self.world_id}/scenes', scene_data)
            scene_id = response.get('id') or response.get('_id')
            if scene_id:
                self.import_log['scenes'].append({
                    'name': scene_data['name'],
                    'id': scene_id,
                    'status': 'created',
                })
            return scene_id
        except Exception as e:
            error_msg = f"Failed to create scene '{scene_data['name']}': {e}"
            self.import_log['errors'].append(error_msg)
            print(error_msg)
            return None

    def get_actors(self) -> List[Dict[str, Any]]:
        """Fetch all actors in the world."""
        try:
            return self._make_request('GET', f'/worlds/{self.world_id}/actors')
        except Exception as e:
            print(f"Failed to fetch actors: {e}")
            return []

    def get_actor_by_name(self, name: str) -> Optional[Dict[str, Any]]:
        """Find an actor by name."""
        actors = self.get_actors()
        return next((a for a in actors if a.get('name') == name), None)

    def get_actor_ids_by_names(self, names: List[str]) -> Dict[str, str]:
        """Look up actor IDs for a list of names (e.g., existing PCs).

        Returns a mapping of name → actor_id for actors that exist in the world.
        Missing actors are omitted from the result.
        """
        actors = self.get_actors()
        actor_map = {a.get('name'): (a.get('id') or a.get('_id')) for a in actors}
        return {name: actor_map[name] for name in names if name in actor_map}

    def get_journals(self) -> List[Dict[str, Any]]:
        """Fetch all journals in the world."""
        try:
            return self._make_request('GET', f'/worlds/{self.world_id}/journals')
        except Exception as e:
            print(f"Failed to fetch journals: {e}")
            return []

    def get_journal_by_name(self, name: str) -> Optional[Dict[str, Any]]:
        """Find a journal by name."""
        journals = self.get_journals()
        return next((j for j in journals if j.get('name') == name), None)

    def get_scenes(self) -> List[Dict[str, Any]]:
        """Fetch all scenes in the world."""
        try:
            return self._make_request('GET', f'/worlds/{self.world_id}/scenes')
        except Exception as e:
            print(f"Failed to fetch scenes: {e}")
            return []

    def upload_asset(self, file_path: str) -> Optional[str]:
        """Upload an image asset to the world.

        Args:
            file_path: Local path to image file

        Returns:
            URL of uploaded asset if successful, None otherwise
        """
        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            return None

        try:
            with open(file_path, 'rb') as f:
                files = {'file': f}
                response = self.session.post(
                    f'{self.foundry_url}/api/worlds/{self.world_id}/assets/upload',
                    files=files,
                    timeout=self.timeout,
                )
                response.raise_for_status()
                result = response.json()
                return result.get('path') or result.get('url')
        except Exception as e:
            print(f"Failed to upload asset '{file_path}': {e}")
            return None

    def batch_create_actors(self, actors: List[Dict[str, Any]], dry_run: bool = False) -> int:
        """Create multiple actors, handling duplicates gracefully.

        Args:
            actors: List of actor JSON objects
            dry_run: If True, log what would be created without sending

        Returns:
            Number of actors created
        """
        created = 0
        existing = {a['name']: a for a in self.get_actors()}

        for actor_data in actors:
            if dry_run:
                print(f"[DRY RUN] Would create actor: {actor_data['name']}")
                created += 1
            else:
                if actor_data['name'] in existing:
                    # Skip duplicates
                    print(f"Actor already exists: {actor_data['name']}, skipping")
                    continue

                if self.create_actor(actor_data):
                    created += 1
                    time.sleep(0.1)  # Rate limiting

        return created

    def batch_create_journals(self, journals: List[Dict[str, Any]], dry_run: bool = False) -> int:
        """Create multiple journal entries."""
        created = 0
        existing = {j['name']: j for j in self.get_journals()}

        for journal_data in journals:
            if dry_run:
                print(f"[DRY RUN] Would create journal: {journal_data['name']}")
                created += 1
            else:
                if journal_data['name'] in existing:
                    print(f"Journal already exists: {journal_data['name']}, skipping")
                    continue

                if self.create_journal(journal_data):
                    created += 1
                    time.sleep(0.1)

        return created

    def batch_create_scenes(self, scenes: List[Dict[str, Any]], dry_run: bool = False) -> int:
        """Create multiple scenes."""
        created = 0
        existing = {s['name']: s for s in self.get_scenes()}

        for scene_data in scenes:
            if dry_run:
                print(f"[DRY RUN] Would create scene: {scene_data['name']}")
                created += 1
            else:
                if scene_data['name'] in existing:
                    print(f"Scene already exists: {scene_data['name']}, skipping")
                    continue

                if self.create_scene(scene_data):
                    created += 1
                    time.sleep(0.1)

        return created

    def get_import_summary(self) -> str:
        """Generate import summary report."""
        summary = f"""
=== Import Summary ===
Actors created: {len(self.import_log['actors'])}
Journals created: {len(self.import_log['journals'])}
Scenes created: {len(self.import_log['scenes'])}
Errors: {len(self.import_log['errors'])}

"""
        if self.import_log['errors']:
            summary += "Errors:\n"
            for error in self.import_log['errors']:
                summary += f"  - {error}\n"

        return summary
