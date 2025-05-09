const buildSupabaseQuery = (supabase, tableName, queryParams, searchableFields = []) => {
    let query = supabase.from(tableName).select('*');

    // GLOBAL SEARCH (search parametresi)
    const search = queryParams.search;
    if (search && searchableFields.length) {
        const orQuery = searchableFields
            .map(field => `${field}.ilike.%${search}%`)
            .join(',');

        query = query.or(orQuery);
    }

    // EQ FİLTRELER (Diğer parametreler)
    Object.keys(queryParams).forEach(key => {
        const value = queryParams[key];

        if (!['search', 'sort', 'sort_dir', 'limit', 'page'].includes(key)) {
            query = query.eq(key, value);
        }
    });

    // SIRALAMA (sort)
    const sortField = queryParams.sort;
    const sortDirection = queryParams.sort_dir;

    if (sortField) {
        query = query.order(sortField, { ascending: sortDirection !== 'desc' });
    }

    // SAYFALAMA (limit + page)
    const limit = parseInt(queryParams.limit) || 20;
    const page = parseInt(queryParams.page) || 1;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    query = query.range(from, to);

    return query;
};

module.exports = buildSupabaseQuery;
