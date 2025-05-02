import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarService } from './snackbar.service';

describe('SnackBarService', () => {
  let service: SnackBarService;
  let matSnackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MatSnackBarModule ],
      providers: [ SnackBarService ]
    });
    service = TestBed.inject(SnackBarService);
    matSnackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(SnackBarService).toBeTruthy();
  });
  
  it('should open a snackbar with the correct message and action', () => {
    const spy = spyOn(matSnackBar, 'open').and.stub();
    service.openSnackBar('Hi', 'Undo', 'error');
    expect(spy).toHaveBeenCalledWith('Hi', 'Undo', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: 'snackbar-error'
    });
  });
});
