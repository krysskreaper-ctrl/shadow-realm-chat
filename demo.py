#!/usr/bin/env python3
"""
Demo script showing different ways to use the Message Repeater
"""

from message_repeater import MessageRepeater
import time


def demo_all_modes():
    """Demonstrates all the different modes of the message repeater."""
    
    print("=" * 60)
    print("  SHADOW REALM CHAT - MESSAGE REPEATER DEMO")
    print("=" * 60)
    print()
    
    # Demo 1: Normal mode
    print("📝 Demo 1: Normal Mode")
    print("-" * 60)
    repeater = MessageRepeater(delay=0.3)
    repeater.repeat_message("Hey there!", count=3)
    time.sleep(2)
    
    # Demo 2: Spam mode
    print("\n📝 Demo 2: Spam Mode")
    print("-" * 60)
    repeater.spam_mode("HAHA", count=5)
    time.sleep(2)
    
    # Demo 3: Ghost mode
    print("\n📝 Demo 3: Ghost Mode")
    print("-" * 60)
    repeater.ghost_mode("I see you", count=2)
    time.sleep(2)
    
    # Demo 4: Custom delay
    print("\n📝 Demo 4: Custom Slow Delay")
    print("-" * 60)
    slow_repeater = MessageRepeater(delay=1.0)
    print("Repeating with 1 second delay...\n")
    slow_repeater.repeat_message("Knock... knock...", count=3)
    
    print("\n" + "=" * 60)
    print("  DEMO COMPLETE!")
    print("=" * 60)
    print("\nNow try it yourself with:")
    print("  python message_repeater.py \"Your message here\" -c 5")
    print()


if __name__ == "__main__":
    demo_all_modes()
