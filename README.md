# Algo Builder dry run and TEAL debugger demo
Demostrates the Algo Builder dry run feature and TEAL debugger with a counter application.

## Setup instructions

### 1. Install packages
```
yarn install
```

### 2. Update environement variables
1. Copy `.env.example` to `.env`.
2. Update Algorand Sandbox credentials in `.env` file.

### 3. Use .env file
```
source .env
```

### 4. Deploy smart contract
```
yarn run algob deploy
```

### 4. Debug app call for add counter
```
yarn run algob run scripts/debug/add_debugger.js
```

The output json file can be found in ./assets folder.


### 5. Create message pack file for TEAL debugger
```
yarn run algob run scripts/debug/add_dryrun.js
```

#### Debug using TEAL debugger
```
# Copy the generated file to sandbox container. Run the command in the sandbox directory.
./sandbox copyTo ./path/to/dryrun/file.msgp

# Run TEAL debugger
./sandbox tealdbg debug -d dryrun.msgp --remote-debugging-port 9392

# Inspect debug output in chrome
chrome://inspect/#devices
```