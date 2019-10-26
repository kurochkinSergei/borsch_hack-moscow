import { UserState } from './user/types';
import { LocaleState } from './locale/types';

export interface State {
  user: UserState,
  locale: LocaleState,
}
