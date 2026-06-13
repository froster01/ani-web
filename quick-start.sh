#!/bin/bash

# ani-web Integration - Quick Start Script
# This script helps you get the integrated system running quickly

set -e

echo "🚀 ani-web + rynix-backend Integration - Quick Start"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Check if MongoDB is running
echo -e "${YELLOW}Step 1: Checking MongoDB...${NC}"
if pgrep -x "mongod" > /dev/null; then
    echo -e "${GREEN}✓ MongoDB is running${NC}"
else
    echo -e "${RED}✗ MongoDB is not running${NC}"
    echo "Start MongoDB with: sudo systemctl start mongod"
    exit 1
fi

# Step 2: Create test license
echo ""
echo -e "${YELLOW}Step 2: Creating test license...${NC}"
mongosh --quiet --eval "
use rynix;
const existing = db.licenses.findOne({ license_key: 'TEST-ANIME-2026' });
if (existing) {
    print('✓ Test license already exists');
} else {
    db.licenses.insertOne({
        license_key: 'TEST-ANIME-2026',
        validityMonths: 12,
        used: false,
        createdAt: new Date()
    });
    print('✓ Created test license: TEST-ANIME-2026');
}
" || echo -e "${RED}Failed to create license. Continue anyway...${NC}"

# Step 3: Check rynix-backend
echo ""
echo -e "${YELLOW}Step 3: Checking rynix-backend...${NC}"
BACKEND_DIR="$HOME/Desktop/project/rynix-backend"
if [ -d "$BACKEND_DIR" ]; then
    echo -e "${GREEN}✓ Backend directory found${NC}"
    
    if [ -f "$BACKEND_DIR/.env" ]; then
        echo -e "${GREEN}✓ .env file exists${NC}"
    else
        echo -e "${RED}✗ .env file missing${NC}"
        echo "Create $BACKEND_DIR/.env with:"
        echo "  PORT=4000"
        echo "  MONGO_URI=mongodb://localhost:27017/rynix"
        echo "  JWT_SECRET=your-secret-key"
        echo "  JWT_REFRESH_SECRET=your-refresh-secret"
    fi
else
    echo -e "${RED}✗ Backend directory not found${NC}"
    exit 1
fi

# Step 4: Check ani-web-fork client
echo ""
echo -e "${YELLOW}Step 4: Checking ani-web client...${NC}"
CLIENT_DIR="$HOME/Desktop/project/ani-web-fork/client"
if [ -d "$CLIENT_DIR" ]; then
    echo -e "${GREEN}✓ Client directory found${NC}"
    
    if [ -d "$CLIENT_DIR/node_modules" ]; then
        echo -e "${GREEN}✓ Dependencies installed${NC}"
    else
        echo -e "${YELLOW}⚠ Dependencies not installed${NC}"
        echo "Run: cd $CLIENT_DIR && npm install"
    fi
else
    echo -e "${RED}✗ Client directory not found${NC}"
    exit 1
fi

echo ""
echo "=================================================="
echo -e "${GREEN}Setup check complete!${NC}"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Start rynix-backend (Terminal 1):"
echo "   cd $BACKEND_DIR"
echo "   npm run dev"
echo ""
echo "2. Install client dependencies (if needed):"
echo "   cd $CLIENT_DIR"
echo "   npm install"
echo ""
echo "3. Start ani-web client (Terminal 2):"
echo "   cd $CLIENT_DIR"
echo "   npm run dev"
echo ""
echo "4. Open browser:"
echo "   http://localhost:5174"
echo ""
echo "5. Register a new account:"
echo "   Username: testuser"
echo "   Password: testpass123"
echo "   License: TEST-ANIME-2026"
echo ""
echo "=================================================="
echo ""
echo -e "${YELLOW}Tip:${NC} Use 'npm run dev' in both terminals simultaneously"
echo -e "${YELLOW}Ports:${NC} rynix-backend (4000), ani-web (5174), rynix-web (5173)"
echo ""
