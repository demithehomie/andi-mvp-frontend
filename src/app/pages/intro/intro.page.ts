import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import Swiper from 'swiper';

register();

@Component({
	selector: 'app-intro',
	templateUrl: './intro.page.html',
	styleUrls: ['./intro.page.scss']
})



export class IntroPage implements OnInit {
  swiperModules = [IonicSlides];

  private swiper: Swiper;
  
	//@ViewChild(IonicSlides)
  //slides!: typeof IonicSlides;

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  //swiper?: Swiper;

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };

	constructor(private router: Router) {
    this.swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      // outras opções aqui
    });
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }

	ngOnInit() {
   // this.swiper = new Swiper('.swiper-container', {
    //  slidesPerView: 1,
    //  spaceBetween: 10,
      // outras opções aqui
  //  });

  }

	slideNext() {
		this.swiper.slideNext();
	}

	async start() {
		await Preferences.set({ key: INTRO_KEY, value: 'true' });
		this.router.navigateByUrl('/login', { replaceUrl: true });
	}
}