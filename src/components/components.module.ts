import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccordionComponent } from './accordion/accordion';

@NgModule({
	declarations: [AccordionComponent],
	imports: [IonicPageModule.forChild(AccordionComponent)],
	exports: [AccordionComponent]
})
export class ComponentsModule {}
