import { InvalidArgumentError } from "@shared/domain/Errors/InvalidArgumentError";
import PaginationProps from "@shared/domain/PaginationProps";

export const validatePagination = (page?: number, pageSize?: number) => {
    let paginationProps: PaginationProps | undefined = undefined;
    if( page && pageSize ) {
        if (page < 0) throw new InvalidArgumentError('Invalid page!');
        if (pageSize < 0) throw new InvalidArgumentError('Invalid page size!');
        paginationProps = {page, pageSize};
    }
    return paginationProps;
}