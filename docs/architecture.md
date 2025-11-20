# System Architecture – FreeBonde x TrustChain

## Overview
This architecture demonstrates how decentralized identity (DID) and verifiable credentials (VCs) enhance trust in indoor farming data.

## Components
1. **Device Module**
   - Measures EC, pH, water level
   - Signs data with device DID key
   - Sends encrypted telemetry

2. **Backend Module**
   - DID registration & resolution
   - VC issuance (PlantGrowthVC, NutrientVC)
   - Data verification & storage

3. **App / Dashboard**
   - DID login for user
   - Retrieves and verifies credentials
   - Displays farm history & device trust score

## Data Flow
Device → Signed Growth Log → Backend → VC Issuance → User Wallet
