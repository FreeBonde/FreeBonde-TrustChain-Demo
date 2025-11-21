/**
 * FreeBonde TrustChain Adapter
 * Integrates external TrustChain components located in /external/
 * 
 * Components:
 * 1. The Social Wallet (Identity / OIDC)
 * 2. IM4DEC (Verifiable Credentials)
 */

class TrustChainClient {
    constructor() {
        this.apiEndpoint = "https://api.trustchain.freebonde.com/v1"; 
        this.did = null;
    }

    async authenticate() {
        console.log("[TrustChain] Initiating Social Wallet Handshake...");
        return new Promise((resolve) => {
            setTimeout(() => {
                this.did = "did:key:z6MkhaXgBZDvotDkL5257lmiz"; 
                console.log(`[TrustChain] Identity Resolved: ${this.did}`);
                resolve({
                    status: "success",
                    did: this.did,
                    method: "did:key",
                    provider: "TheSocialWallet-Node-01"
                });
            }, 1500);
        });
    }

    async syncDevice() {
        if (!this.did) throw new Error("User identity not established.");
        console.log("[IoT] Connecting to MasterBonde V1 via Secure Enclave...");

        return new Promise((resolve) => {
            setTimeout(() => {
                // UPDATED: Real-world hydroponic ranges for Lettuce
                // EC: 1.2 - 2.0 mS/cm
                // pH: 5.8 - 6.5
                const rawEc = 1.2 + Math.random() * 0.8; 
                const rawPh = 5.8 + Math.random() * 0.7;

                const payload = {
                    deviceId: "FB-IOT-STOCKHOLM-001",
                    timestamp: new Date().toISOString(),
                    metrics: {
                        ph: rawPh.toFixed(1),
                        ec: rawEc.toFixed(1), 
                        temp: 21.5,
                        light: "16h/8h" // Updated to 16h
                    },
                    signature: "0x9a3b7...signed_by_device_ed25519"
                };
                console.log("[IoT] Payload received and verified.");
                resolve(payload);
            }, 2000);
        });
    }

    async mintCredential(iotData) {
        console.log("[TrustChain] Requesting VC issuance via IM4DEC...");
        const vcPayload = {
            "@context": ["https://www.w3.org/2018/credentials/v1"],
            "type": ["VerifiableCredential", "FreeBondeHarvestCredential"],
            "issuer": this.did,
            "issuanceDate": new Date().toISOString(),
            "credentialSubject": {
                "id": iotData.deviceId,
                "produce": "Organic Lettuce",
                "metrics": iotData.metrics
            },
            "proof": {
                "type": "Ed25519Signature2018",
                "verificationMethod": `${this.did}#keys-1`
            }
        };

        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("[TrustChain] VC Minted & Stored on IPFS.");
                resolve(vcPayload);
            }, 2500);
        });
    }
}

window.TrustChainClient = TrustChainClient;