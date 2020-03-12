import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HandtekeningPaginaPage } from './handtekening-pagina.page';

describe('HandtekeningPaginaPage', () => {
  let component: HandtekeningPaginaPage;
  let fixture: ComponentFixture<HandtekeningPaginaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandtekeningPaginaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HandtekeningPaginaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
