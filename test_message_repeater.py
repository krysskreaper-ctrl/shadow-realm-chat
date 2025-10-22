#!/usr/bin/env python3
"""
Unit tests for the Message Repeater
"""

import unittest
import sys
from io import StringIO
from message_repeater import MessageRepeater


class TestMessageRepeater(unittest.TestCase):
    """Test cases for the MessageRepeater class"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.repeater = MessageRepeater(delay=0.0)  # No delay for faster tests
    
    def test_repeat_message_count(self):
        """Test that repeat_message returns correct number of messages"""
        message = "Test message"
        count = 5
        
        messages = self.repeater.repeat_message(message, count)
        
        self.assertEqual(len(messages), count)
        self.assertTrue(all(msg == message for msg in messages))
    
    def test_repeat_message_single(self):
        """Test repeating a message once"""
        message = "Single message"
        messages = self.repeater.repeat_message(message, 1)
        
        self.assertEqual(len(messages), 1)
        self.assertEqual(messages[0], message)
    
    def test_spam_mode(self):
        """Test spam mode functionality"""
        message = "Spam test"
        count = 10
        
        messages = self.repeater.spam_mode(message, count)
        
        self.assertEqual(len(messages), count)
        self.assertTrue(all(msg == message for msg in messages))
    
    def test_ghost_mode(self):
        """Test ghost mode functionality"""
        message = "Ghost test"
        count = 3
        
        messages = self.repeater.ghost_mode(message, count)
        
        self.assertEqual(len(messages), count)
        # Ghost mode adds emoji decorations
        self.assertTrue(all("👻" in msg for msg in messages))
        self.assertTrue(all(message in msg for msg in messages))
    
    def test_custom_delay(self):
        """Test that custom delay is set correctly"""
        custom_delay = 1.5
        repeater = MessageRepeater(delay=custom_delay)
        
        self.assertEqual(repeater.delay, custom_delay)
    
    def test_empty_message(self):
        """Test repeating an empty message"""
        messages = self.repeater.repeat_message("", 3)
        
        self.assertEqual(len(messages), 3)
        self.assertTrue(all(msg == "" for msg in messages))


def run_tests():
    """Run all tests and display results"""
    print("=" * 60)
    print("  RUNNING MESSAGE REPEATER TESTS")
    print("=" * 60)
    print()
    
    # Redirect stdout during tests to reduce noise
    suite = unittest.TestLoader().loadTestsFromTestCase(TestMessageRepeater)
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    print()
    print("=" * 60)
    if result.wasSuccessful():
        print("  ✅ ALL TESTS PASSED!")
    else:
        print("  ❌ SOME TESTS FAILED!")
    print("=" * 60)
    print()
    
    return 0 if result.wasSuccessful() else 1


if __name__ == "__main__":
    sys.exit(run_tests())
