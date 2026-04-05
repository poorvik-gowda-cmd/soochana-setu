/**
 * Audit Log Utility
 * This function allows manual integration of the ledger into other modules.
 */

export async function createAuditEntry(citizen_id: string, action: string, data: any) {
    try {
        const response = await fetch('/api/audit-log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ citizen_id, action, data }),
        });
        
        if (!response.ok) {
            console.error('Failed to create audit entry');
        }
        
        return await response.json();
    } catch (err) {
        console.error('Audit Error:', err);
        return null;
    }
}
