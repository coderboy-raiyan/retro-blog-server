export type TSortOrder = 'asc' | 'desc';

type TOptions = {
    page?: number | string;
    limit?: number | string;
    sortBy?: string;
    sortOrder?: TSortOrder;
};

function paginationSortingHelper(options: TOptions) {
    const page = Number(options?.page || 1);
    const limit = Number(options?.limit || 10);
    const skip = (page - 1) * limit;

    const sortBy = options?.sortBy || 'createdAt';
    let sortOrder = options?.sortOrder || 'desc';

    if (sortOrder !== 'asc') {
        if (sortOrder !== 'desc') {
            sortOrder = 'desc';
        }
    }

    return {
        limit,
        skip,
        page,
        orderBy: {
            [sortBy]: sortOrder,
        },
    };
}

export default paginationSortingHelper;
