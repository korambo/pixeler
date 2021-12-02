import { SubjectState } from '@objects/base/Subject/constants';
import { AIAction } from '@core/AI';

export interface EnemyState extends SubjectState {
  aiAction: AIAction;
}
