import { Component, OnInit } from '@angular/core';

declare interface TableData {
	headerRow: string[];
	dataRows: string[][];
}



@Component({
	selector: 'table-cmp',
	moduleId: module.id,
	templateUrl: 'table.component.html'
})



export class TableComponent implements OnInit {


	public tableData: any = [
		{
			Status: "Single",
			Type: "General Request",
			Date: "2029",
			image: "https://phplaravel-401379-1623642.cloudwaysapps.com/storage/media/category/arebian-icon.jpg",
			Car: ["asdfadsf", "asdasdf"]
		},
		{
			Status: "Draft",
			Type: "General Request",
			Date: "2029",
			image: "https://phplaravel-401379-1623642.cloudwaysapps.com/storage/media/category/arebian-icon.jpg",
			Car: ["asdfadsf", "asdasdf"]
		},
		{
			Status: "Draft",
			Type: "General Request",
			Date: "2029",
			image: "https://phplaravel-401379-1623642.cloudwaysapps.com/storage/media/category/arebian-icon.jpg",
			Car: ["asdfadsf", "asdasdf"]
		},
		{
			Status: "two",
			Type: "General Request",
			Date: "2029",
			image: "https://phplaravel-401379-1623642.cloudwaysapps.com/storage/media/category/arebian-icon.jpg",
			Car: ["asdfadsf", "asdasdf"]
		},
		{
			Status: "One",
			Type: "General Request",
			Date: "2029",
			image: "https://phplaravel-401379-1623642.cloudwaysapps.com/storage/media/category/arebian-icon.jpg",
			Car: ["asdfadsf", "asdasdf"]
		},
		{
			Status: "Test",
			Type: "General Request2",
			Date: "2029",
			image: "https://phplaravel-401379-1623642.cloudwaysapps.com/storage/media/category/arebian-icon.jpg",
			Car: ["asdfadsf", "asdasdf"],
		},
	];




	public columnStructure: any = [
		{
			name: "Information",
			key: "Car",
			type: "select",
			cols: ["carModel"]
		},
		{
			name: "Status",
			key: "Status",
			type: "single",
			cols: ["status"]
		},
		{
			name: "Type",
			key: "Type",
			type: "single",
			cols: ["requestType"]
		},
		{
			name: "Button",
			key: "InformationButton",
			type: "button",
			cols: ["requestType"]
		},
		{
			name: "Chip",
			key: "InformationChip",
			type: "chip",
			cols: ["requestType"]
		},
		{
			name: "Image",
			key: "image",
			type: "image",
			cols: ["requestType"]
		},
		{
			name: "Toogle",
			key: "Information",
			type: "toggle_slider",
			cols: ["requestType"]
		},
	];


	public tableWidgetData: {
		columnStructure: Array<object>,
		bulkActions: Array<object>,
		data: Array<object>,
		statusInfoNChanges: object,
		tableSearch: boolean

	};

	ngOnInit() {
		this.initTableData();
	}


	async initTableData() {
		this.tableWidgetData = {
			columnStructure: this.columnStructure,
			data: this.tableData,
			statusInfoNChanges: [],
			tableSearch: true,
			bulkActions: [],
		};

	}
}
