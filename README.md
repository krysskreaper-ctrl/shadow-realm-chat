# shadow-realm-chat
dark chat zombyBomby

## Message Repeater - Prank Your Friends! 😈

A fun command-line tool to repeat messages multiple times - perfect for pranking your friends in chat!

### Features

- 🔄 **Normal Mode**: Repeat messages with customizable delays
- 🔥 **Spam Mode**: Rapid-fire message spam for maximum impact
- 👻 **Ghost Mode**: Spooky mysterious messages with haunting effects
- ⚙️ **Customizable**: Adjust repeat count and delays to your liking

### Installation

No installation needed! Just Python 3.x required.

```bash
# Make the script executable (optional)
chmod +x message_repeater.py
```

### Usage

#### Basic Usage

```bash
# Repeat a message 5 times (default)
python message_repeater.py "Hello there!"

# Repeat a message 10 times
python message_repeater.py "LOL" -c 10

# Custom delay between messages (2 seconds)
python message_repeater.py "Knock knock" -c 5 -d 2.0
```

#### Spam Mode 🔥

Rapid-fire messages with minimal delay:

```bash
python message_repeater.py "HAHAHA" --spam -c 20
```

#### Ghost Mode 👻

Mysterious spooky messages:

```bash
python message_repeater.py "I'm watching you" --ghost -c 3
```

### Command-Line Options

```
positional arguments:
  message               The message to repeat

options:
  -h, --help            Show help message
  -c, --count COUNT     Number of times to repeat (default: 5, max: 100)
  -d, --delay DELAY     Delay in seconds between messages (default: 0.5)
  --spam                Enable spam mode - rapid fire!
  --ghost               Enable ghost mode - spooky messages!
```

### Examples

```bash
# Prank your friend with repeated messages
python message_repeater.py "Why are you ignoring me?" -c 15

# Spam mode for maximum annoyance 😈
python message_repeater.py "HEY" --spam -c 50

# Creepy ghost messages
python message_repeater.py "I know what you did" --ghost -c 5

# Slow dramatic effect
python message_repeater.py "Knock... knock..." -c 3 -d 3.0
```

### Tips for Maximum Prank Effect

1. **Timing is everything**: Use during active conversations for best results
2. **Mix it up**: Try different modes to keep them guessing
3. **Don't overdo it**: Keep it fun, not annoying! (Well, maybe a little annoying 😏)
4. **Ghost mode at night**: Extra spooky effect when it's dark
5. **Rapid spam**: Use spam mode when they're AFK for a surprise when they return

### Responsible Use

⚠️ **Important**: This tool is meant for harmless fun with friends. Please use responsibly and don't harass anyone. Know when a joke has gone too far!

### License

Free to use for pranking friends! Have fun in the Shadow Realm! 🌙
