export interface Device {
    deviceId: string;
    connectionState: string;
    status: string;
    statusReason: string;
    authentication: SymetricAuthentication;
}

export interface SymetricAuthentication {
    symmetricKey: { [key: string]: string };
}
