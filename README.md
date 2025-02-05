# Word Song Challenge

A fun word game that challenges players to think of songs containing randomly generated words!

<https://bombi.rocks>

## Setup

1. Clone the repository:
```bash
git clone https://github.com/Roald87/random-word-display.git
cd random-word-display
```

2. Install dependencies:
```bash
npm install
```

## Development

To run the development server:

```bash
npm run start
```

The server will start on `http://localhost:3000`


## Building for Production

To create a production build:
```bash
npm run build
```

## Setup on server 

``` 
# Check Node version
node -v  # Should be v20.x.x

# Install Next.js CLI globally
npm install -g next

# Navigate to project
cd /var/www/bombirocks

# Verify .next directory exists
ls -la .next

# If no .next directory, rebuild
npm run build

# Update PM2 to use correct path
pm2 delete bombirocks
pm2 start npm --name "bombirocks" -- start

# Verify process
pm2 logs bombirocks
```

To update 

```
npm run build
pm2 restart bombirocks
```

Check the logs

``` 
pm2 logs bombirocks
```
