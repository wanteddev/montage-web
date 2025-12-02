import Android from './modules/android';
import IOS from './modules/ios';

const run = async () => {
  (await new Android().gitClone()).load().convert().save().cleanup();
  (await new IOS().gitClone()).load().convert().save().cleanup();
};

run();
