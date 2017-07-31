import { Subject } from 'rxjs/Rx';

export class UserService {
  userActivated = new Subject();
}
