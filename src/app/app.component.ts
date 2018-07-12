import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NetworkProvider } from '../providers/network/network'
// import { TranslateService } from '@ngx-translate/core';
import { Nav, Platform, MenuController, Events, ToastController } from 'ionic-angular';//Config
import { FirstRunPage, HomePage } from '../pages';

import { GLOBAL } from '../app/global';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = FirstRunPage;
  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Home', component: 'HomePage', icon: 'home' },
    { title: 'Results', component: 'ResultsPage', icon: 'document'},
    { title: 'About Family', component: 'AboutFamilyPage', icon: 'information-circle' },
    { title: 'Gallery', component: 'GalleryPage', icon: 'images'},
    { title: 'News', component: 'NewsPage', icon: 'paper'},
    { title: 'My Profile', component: 'MyProfilePage', icon: 'contact'},
  ]
  _user: any;
  
  constructor(
    // private translate: TranslateService, 
    platform: Platform, 
    // private config: Config, 
    public toastCtrl: ToastController,
    private events: Events, 
    private statusBar: StatusBar, 
    private menuCtrl: MenuController, 
    public networkProvider: NetworkProvider,
    private splashScreen: SplashScreen,
    private oneSignal: OneSignal,
  ) {
    if (GLOBAL.IS_LOGGEDIN){
      this.rootPage = HomePage;  
    }
    this._user = GLOBAL.USER;
    this.events.subscribe('user:loggedIn', (user) => { 
      GLOBAL.IS_LOGGEDIN = true;
      GLOBAL.USER = user;
      this._user = user; 
    });
    platform.ready().then(() => {
      try {
        
        this.networkProvider.initializeNetworkEvents();

        // Offline event
        // this.events.subscribe('network:offline', () => {
        //   let toast = this.toastCtrl.create({
        //     message: 'No internet connection',
        //     duration: 2000,
        //     cssClass: 'toast-error',
        //     position: 'bottom'
        //   });
        //   toast.present();
        // });

        // Online event
        // this.events.subscribe('network:online', () => {
        //   let toast = this.toastCtrl.create({
        //     message: 'Internet connection is on',
        //     duration: 2000,
        //     cssClass: 'toast-success',
        //     position: 'bottom'
        //   });
        //   toast.present();
        // });
      } catch (error) {
        console.log(error);
      }

      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      // OneSignal Code start:
      // Enable to debug issues:
      // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
      try{
        this.oneSignal.startInit(GLOBAL.ONESIGNAL_APPID, GLOBAL.SENDER_ID);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
        this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
        this.oneSignal.endInit();
      }
      catch (error){
        console.log('This is a native feature. Please use a device');
      }
    });
  }

  private onPushReceived(payload: OSNotificationPayload) {
    alert('Push recevied:' + payload.body);
  }

  private onPushOpened(payload: OSNotificationPayload) {
    alert('Push opened: ' + payload.body);
  }  

  openPage(page) {
    this.nav.push(page.component);
  }

  logout() {
    GLOBAL.IS_LOGGEDIN = false;
    GLOBAL.USER = null;
    localStorage.removeItem('is_loggedin');
    this.nav.setRoot('LoginPage');
    this.menuCtrl.close();
  }
}
