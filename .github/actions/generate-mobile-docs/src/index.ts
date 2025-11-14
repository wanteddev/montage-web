import Android from './modules/android';
import IOS from './modules/ios';

const run = async () => {
  const android = new Android();

  await android.gitClone();

  android.load();
  android.convert();
  android.save();
  android.cleanup();

  const ios = new IOS();

  await ios.gitClone();

  ios.load();
  ios.convert();
  ios.save();
  ios.cleanup();
};

run();
