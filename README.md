# bip39 rescue

## usage
- node sign.js MNEMONIC KEY\_INDEX TARGET\_ADDRESS AMOUNT TXS
- TXS is of the form "tx\_hash|output\_index", separated by commas

## example
- node sign.js "unfair tuna lock unfair sort first obscure east knock tag account kind goddess carry develop filter level mammal round rose mad truck spirit snap" 2 1JH8yrFgYzSv2yEJ8EYp6CPkyhpuhSwMiW 10 "8c7fe77a5afa6ecea7d0b09be5fd8d46824203c7f736a1fed459868e0750a1bc|1,8c7fe77a5afa6ecea7d0b09be5fd8d46824203c7f736a1fed459868e0750a1bd|3"
- meaning:
  - use mnemonic: unfair tuna lock unfair sort first obscure east knock tag account kind goddess carry develop filter level mammal round rose mad truck spirit snap
  - key index: 2
  - target address: 1JH8yrFgYzSv2yEJ8EYp6CPkyhpuhSwMiW 
  - amount: 10 (the remainder is paid as miner fee)
  - use inputs from tx 8c7fe77a5afa6ecea7d0b09be5fd8d46824203c7f736a1fed459868e0750a1bc, output index 1
  - use inputs from tx 8c7fe77a5afa6ecea7d0b09be5fd8d46824203c7f736a1fed459868e0750a1bd, output index 3
