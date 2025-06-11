import Service from './service';
import { getAllFeatures } from '../data/constants/endPoint';

class FeatureService extends Service {
  constructor() {
    super(getAllFeatures);
  }
}

export default new FeatureService();