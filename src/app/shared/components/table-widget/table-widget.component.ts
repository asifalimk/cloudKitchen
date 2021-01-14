import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-table-widget',
	templateUrl: './table-widget.component.html',
	styleUrls: ['./table-widget.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class TableWidgetComponent implements OnInit {

	constructor() { }

	@Input() tableData: {
		columnStructure: Array<object>,
		data: any,
		statusInfoNChanges?: object
		tableName?: string
		tableSearch?: boolean,
		changedStatusId: number
	};

	@Output() rowClicked = new EventEmitter<any>();

	@Output() buttonClicked = new EventEmitter<any>();

	@Output() matMenuClicked = new EventEmitter<any>();

	public bulkActions: object;

	public tableSearch: boolean;

	public dataSources: MatTableDataSource<any>;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	public selection = new SelectionModel<MatTableDataSource<any>>(true, []);

	public isOneSelected = true;

	ngOnInit(): void {
		
	}

	ngOnChanges(){
		this.initTableData();
	}

	/**
	   * Initializes Table Columns and DataSource
	   * When the parent component updates table data this method will be called
	   */
	initTableData(): void {
		// @ts-ignore
		this.displayedColumns = this.tableData.columnStructure.map(column => column.key);
		this.dataSources = new MatTableDataSource(this.tableData.data);

		// this.tableData.data.forEach((table, index) => {
		// 	this.dataSources.push(new MatTableDataSource<any>(table.data));
		// });

		// this.bulkActions = this.tableData.bulkActions;
		this.tableSearch = this.tableData.tableSearch;
	}

	/**
	 * 
	 * @param filterValue 
	 * filter table data
	 */
	applyFilter(filterValue: string) {
		this.dataSources.filter = filterValue.trim().toLowerCase();
	}

	getChildrenKeys(parent: any) {
		if (parent.SubItems) {
			return Object.keys(parent.SubItems);
		}
	}

	ngAfterViewInit() {
		this.dataSources.paginator = this.paginator;
	}

	/**
 *
 * @param row
 */
	tableRowClicked(row): void {

		this.eventRowClicked(row);
	}

	buttonlicked(row): void {

		this.eventButtonClicked(row);
	}

	toggleSubItems(row): void {
		row.expanded = (!row.expanded);
	}

	// region events for parent

	eventRowClicked(row) {
		this.rowClicked.emit(row);
	}

	eventButtonClicked(row) {
		this.buttonClicked.emit(row);
	}


	eventActionToggleButtonPressed(row) {
		row.available = !row.available;
		// this.toggleButtonPressed.emit({row:row});
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: any): string {
		this.isOneSelectedFn();
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
	}

	isOneSelectedFn() {
		if (this.selection.selected.length > 0) {
			this.isOneSelected = false;
		} else {
			this.isOneSelected = true;
		}

	}

	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSources.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isOneSelectedFn();
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSources.data.forEach(row => this.selection.select(row));
	}

	/***
	 * 
	 */
	matMenuItemClicked(row: any,type: string) {
		this.matMenuClicked.emit({data:row,type:type});
	}

}
