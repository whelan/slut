#!/usr/bin/env python3
"""
Stop hook: Tjekker at genereret D&D-indhold overholder 2024-regler.
Advarer mod brug af 2014-specifikke mekanikker eller forældede termer.
"""

import json
import re
import sys

# 2014-terminologi der IKKE må bruges i 2024-kontekst
# Format: (regex-mønster, forklaring, 2024-alternativ)
OUTDATED_PATTERNS = [
    # Actions der er ændret/omdøbt
    (r"\buse an object\b", "2014: 'Use an Object' action", "2024: 'Utilize' action"),
    (r"\buse object action\b", "2014: 'Use Object' action", "2024: 'Utilize' action"),

    # Exhaustion – 2014 specificerede unikke penalties per niveau
    (r"exhaustion.*disadvantage on ability checks",
     "2014: Exhaustion niveau 1 = disadvantage on ability checks",
     "2024: Exhaustion = -1 per niveau til alle D20 Tests"),
    (r"exhaustion.*speed halved",
     "2014: Exhaustion niveau 2 = speed halved",
     "2024: Exhaustion = -1 per niveau til alle D20 Tests"),

    # True Strike – komplet redesign i 2024
    (r"true strike.*reaction", "2014: True Strike brugte Reaction",
     "2024: True Strike er en Action (cantrip weapon attack med Int/Cha)"),
    (r"true strike.*advantage on your next attack",
     "2014: True Strike gav advantage på næste attack",
     "2024: True Strike er en Action-cantrip weapon attack"),

    # Guidance – ændret til Action
    (r"guidance.*reaction", "2014: Guidance var Reaction",
     "2024: Guidance er en Action"),
    (r"guidance.*bonus action", "2014: Guidance var ikke Bonus Action i 2014 heller",
     "2024: Guidance er en Action"),

    # Healing Word – ny damage i 2024
    (r"healing word.*1d4", "2014: Healing Word = 1d4 + mod",
     "2024: Healing Word = 2d4 + mod"),

    # Silvery Barbs – ikke i SRD
    (r"\bsilvery barbs\b",
     "Silvery Barbs er ikke i SRD og bør markeres som homebrew/ikke-SRD",
     "Brug Cutting Words (Bard) eller lignende SRD-alternativer hvis relevant"),

    # Gamma-ændring: Grapple som separate special attack
    (r"grapple.*special attack",
     "2014: Grapple var en 'special melee attack'",
     "2024: Grapple bruger Attack action (en af dine attacks), Athletics vs. Acrobatics/Athletics"),

    # Monk: Stunning Strike cost ændret
    (r"stunning strike.*ki point",
     "2014: Stunning Strike kostede 1 ki point",
     "2024: Stunning Strike kostede 1 Focus Point (ki hedder nu Focus Points)"),
    (r"\bki points?\b",
     "2014: Monk-ressourcen hed 'Ki Points'",
     "2024: Monk-ressourcen hedder 'Focus Points'"),
]

# Termer der KUN gælder 2024 og er korrekte (whitelist – disse er OK)
ALLOWED_2024_TERMS = [
    "focus points",
    "utilize",
    "weapon mastery",
    "study action",
    "influence action",
    "magic action",
]


def get_last_assistant_message(data):
    messages = data.get("messages", [])
    for msg in reversed(messages):
        if msg.get("role") == "assistant":
            content = msg.get("content", "")
            if isinstance(content, list):
                parts = [c.get("text", "") for c in content if isinstance(c, dict)]
                return " ".join(parts)
            return str(content)
    return ""


def check_rules(text):
    violations = []
    text_lower = text.lower()
    for pattern, problem, fix in OUTDATED_PATTERNS:
        if re.search(pattern, text_lower):
            violations.append((problem, fix))
    return violations


def main():
    try:
        data = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        sys.exit(0)

    if data.get("stop_hook_active"):
        sys.exit(0)

    text = get_last_assistant_message(data)
    if not text:
        sys.exit(0)

    violations = check_rules(text)
    if violations:
        print("⚠️  Mulig 2014-regel brugt – tjek følgende:", file=sys.stderr)
        for problem, fix in violations:
            print(f"  • {problem}", file=sys.stderr)
            print(f"    → {fix}", file=sys.stderr)
        print("", file=sys.stderr)
        print("Bekræft at outputtet bruger 2024-regler før du fortsætter.", file=sys.stderr)
        sys.exit(2)

    sys.exit(0)


if __name__ == "__main__":
    main()
