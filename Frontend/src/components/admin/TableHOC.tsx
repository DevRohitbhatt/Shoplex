import { FaSortAlphaUp, FaSortAlphaDownAlt } from 'react-icons/fa';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import {
	useReactTable,
	getCoreRowModel,
	ColumnDef,
	flexRender,
	getSortedRowModel,
	SortingState,
	getFilteredRowModel,
	getPaginationRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';

const TableHOC = <T extends object>(columns: ColumnDef<T>[], data: T[]) => {
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		debugTable: true,
	});

	return (
		<div className='rounded-2xl border-[1px] shadow-md'>
			<div className='overflow-y-auto h-96'>
				<table className='w-full'>
					<thead className='sticky top-0 w-full bg-gray-50 '>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className='px-4 text-sm tracking-wide text-left text-gray-500 h-14'
									>
										<div
											{...{
												className: header.column.getCanSort()
													? 'cursor-pointer flex gap-1 items-center'
													: '',
												onClick: header.column.getToggleSortingHandler(),
											}}
										>
											{flexRender(header.column.columnDef.header, header.getContext())}
											{{ asc: <FaSortAlphaUp />, desc: <FaSortAlphaDownAlt /> }[
												header.column.getIsSorted() as string
											] ?? null}
										</div>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id} className='border-b'>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className='px-4 py-4 font-medium'>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* pagination */}
			<div className='flex items-center justify-end px-4 py-3 space-x-10 border-t-[1px]'>
				<div className='flex items-center space-x-4 text-sm'>
					<h3>Rows per page:</h3>
					<select
						value={table.getState().pagination.pageSize}
						onChange={(e) => {
							table.setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								{pageSize}
							</option>
						))}
					</select>
				</div>
				<div className='flex items-center gap-1 text-sm'>
					<span>Page</span>
					<strong>
						{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
					</strong>
				</div>
				<div className='flex gap-2 text-2xl'>
					<button
						className='p-2 rounded-full cursor-pointer hover:bg-gray-100'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<MdKeyboardArrowLeft />
					</button>
					<button
						className='p-2 rounded-full cursor-pointer hover:bg-gray-100'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<MdKeyboardArrowRight />
					</button>
				</div>
			</div>
		</div>
	);
};

export default TableHOC;
