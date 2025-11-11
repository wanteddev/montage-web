import Android from './modules/android';
import IOS from './modules/ios';

const run = async () => {
  const android = new Android();
  const ios = new IOS();

  await android.gitClone();
  await ios.gitClone();

  android.load();
  android.convert();
  android.save();

  ios.load();
  ios.convert();
  ios.save();
};

run();
