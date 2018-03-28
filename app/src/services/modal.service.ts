import { Injectable } from '@angular/core';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

export interface NgbModalOptions {
    backdrop?: boolean | 'static';
    keyboard?: boolean;
    size?: 'sm' | 'lg';
}

@Injectable()
export class ModalService {
    constructor(private modalService: NgbModal) { }

    open(modalName, options: NgbModalOptions = {}) {
        this.modalService.open(modalName, options);
    }
}
