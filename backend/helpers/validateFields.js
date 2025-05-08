function validateFields(data, operation) {
    const REQUIRED_FIELDS = {
        product_post: ['productId', 'productName'],
        product_put: ['productId'],  // example
        supplier_post: ['supplierId', 'supplierName']
    };    
    const operationKey = operation?.toLowerCase();
    const requiredFields = REQUIRED_FIELDS[operation];

    if (!requiredFields) {
        throw new Error(`Unknown operation: ${operation}`);
    }

    const missingFields = requiredFields.filter(field => {
        const value = data?.[field];
        // Check if missing
        return value === undefined || value === null || value === '';
    });

    return { missingFields };
 
}

module.exports = validateFields;
