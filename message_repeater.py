#!/usr/bin/env python3
"""
Shadow Realm Chat - Message Repeater
A fun tool to repeat messages for pranking friends!
"""

import time
import sys
import argparse


class MessageRepeater:
    """Repeats messages with optional delays - perfect for pranking friends!"""
    
    def __init__(self, delay=0.5):
        """
        Initialize the message repeater.
        
        Args:
            delay (float): Delay in seconds between repeated messages
        """
        self.delay = delay
    
    def repeat_message(self, message, count=5):
        """
        Repeat a message multiple times.
        
        Args:
            message (str): The message to repeat
            count (int): Number of times to repeat the message
            
        Returns:
            list: List of repeated messages
        """
        messages = []
        for i in range(count):
            messages.append(message)
            print(f"[{i+1}/{count}] {message}")
            if i < count - 1:  # Don't delay after the last message
                time.sleep(self.delay)
        return messages
    
    def spam_mode(self, message, count=10):
        """
        Spam mode - rapid fire messages with minimal delay!
        
        Args:
            message (str): The message to spam
            count (int): Number of times to spam
            
        Returns:
            list: List of spammed messages
        """
        print(f"\n🔥 SPAM MODE ACTIVATED 🔥")
        print(f"Sending '{message}' {count} times...\n")
        
        messages = []
        for i in range(count):
            messages.append(message)
            print(message)
            time.sleep(0.1)  # Fast spam!
        
        print(f"\n✅ Sent {count} messages!")
        return messages
    
    def ghost_mode(self, message, count=3):
        """
        Ghost mode - mysterious repeated messages with fading effect
        
        Args:
            message (str): The message to send mysteriously
            count (int): Number of times to repeat
            
        Returns:
            list: List of ghostly messages
        """
        print(f"\n👻 GHOST MODE ACTIVATED 👻")
        print(f"Sending mysterious messages...\n")
        
        messages = []
        for i in range(count):
            ghostly_message = f"👻 {message} 👻"
            messages.append(ghostly_message)
            print(ghostly_message)
            time.sleep(1.5)  # Spooky delay
        
        print(f"\n✅ Haunted {count} times!")
        return messages


def main():
    """Main CLI interface for the message repeater."""
    parser = argparse.ArgumentParser(
        description="Shadow Realm Chat - Message Repeater for pranking friends!",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Repeat a message 5 times
  python message_repeater.py "Hello there!" -c 5
  
  # Spam mode - rapid fire!
  python message_repeater.py "LOL" --spam -c 20
  
  # Ghost mode - spooky messages
  python message_repeater.py "I'm watching you" --ghost -c 3
  
  # Custom delay between messages
  python message_repeater.py "Knock knock" -c 10 -d 2.0
        """
    )
    
    parser.add_argument(
        "message",
        help="The message to repeat"
    )
    
    parser.add_argument(
        "-c", "--count",
        type=int,
        default=5,
        help="Number of times to repeat the message (default: 5)"
    )
    
    parser.add_argument(
        "-d", "--delay",
        type=float,
        default=0.5,
        help="Delay in seconds between messages (default: 0.5)"
    )
    
    parser.add_argument(
        "--spam",
        action="store_true",
        help="Enable spam mode - rapid fire messages!"
    )
    
    parser.add_argument(
        "--ghost",
        action="store_true",
        help="Enable ghost mode - spooky mysterious messages!"
    )
    
    args = parser.parse_args()
    
    # Validate count
    if args.count < 1:
        print("Error: Count must be at least 1", file=sys.stderr)
        sys.exit(1)
    
    if args.count > 100:
        print("Warning: That's a lot of messages! Limiting to 100.")
        args.count = 100
    
    # Create repeater
    repeater = MessageRepeater(delay=args.delay)
    
    print(f"\n{'='*60}")
    print(f"  SHADOW REALM CHAT - MESSAGE REPEATER")
    print(f"{'='*60}\n")
    
    # Execute appropriate mode
    try:
        if args.spam:
            repeater.spam_mode(args.message, args.count)
        elif args.ghost:
            repeater.ghost_mode(args.message, args.count)
        else:
            print(f"Repeating: '{args.message}' {args.count} times")
            print(f"Delay: {args.delay} seconds\n")
            repeater.repeat_message(args.message, args.count)
            print(f"\n✅ Done! Sent {args.count} messages.")
    
    except KeyboardInterrupt:
        print("\n\n⚠️  Interrupted by user. Prank aborted!")
        sys.exit(0)
    
    print(f"\n{'='*60}\n")


if __name__ == "__main__":
    main()
