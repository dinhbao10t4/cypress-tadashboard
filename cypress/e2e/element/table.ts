import {format} from 'util';

class Table {
    elements = {
        tableLocator : () => cy.get("#ccontent table")
    }

    async getColumnDataByColumnHeader(headerName: string) {
        const headerIndex = await this.getColumnHeaderIndex(headerName);

        return new Cypress.Promise<{result: string[]}>((resolve, reject) => {
            let items: string[] = [];
            cy.get('#ccontent table > tbody > tr > td:nth-child(' + headerIndex + ')').each(($elm, index, $list)=> {
                items.push($elm.text());
            }).then(() => {
                return resolve({result: items});
            });

        });
    }

    async getColumnHeaderIndex(headerName: string) {
        return new Cypress.Promise((resolve, reject) => {
            let result: number = 0;
            this.elements.tableLocator().find('tbody tr th').each(($thead, index) => {
                if ($thead.text() === headerName) {
                    result = index + 1;
                }
            }).then(() => {
                return resolve(result);
            });
        });
    }
}

export default Table;
