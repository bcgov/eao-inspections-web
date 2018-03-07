import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
    constructor(private modalService: NgbModal) { }

    open(modalName) {
        this.modalService.open(modalName);
    }
}