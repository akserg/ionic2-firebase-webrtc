import {Page} from 'ionic-angular';
import {ChatPage} from '../chat/chat';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  chatPage: any = ChatPage;
}
