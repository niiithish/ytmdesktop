import { BrowserView } from "electron";
import { ElectronBlocker } from "@ghostery/adblocker-electron";

import IIntegration from "../integration";

export default class AdBlocker implements IIntegration {
  private ytmView: BrowserView;
  private blocker: ElectronBlocker | null = null;
  private isEnabled = false;

  public provide(ytmView: BrowserView): void {
    this.ytmView = ytmView;
  }

  public async enable(): Promise<void> {
    if (this.isEnabled || !this.ytmView) return;

    try {
      // Create blocker from prebuilt ads and tracking lists (EasyList, EasyPrivacy, etc.)
      this.blocker = await ElectronBlocker.fromPrebuiltAdsAndTracking(globalThis.fetch);

      // Get the session used by ytmView
      const ytmSession = this.ytmView.webContents.session;

      // Enable blocking in the ytmView session
      this.blocker.enableBlockingInSession(ytmSession);

      this.isEnabled = true;
    } catch (error) {
      console.error("Failed to enable adblocker:", error);
    }
  }

  public disable(): void {
    if (!this.isEnabled || !this.blocker) return;

    try {
      // Get the session used by ytmView
      const ytmSession = this.ytmView.webContents.session;

      // Disable blocking in the session
      this.blocker.disableBlockingInSession(ytmSession);

      this.blocker = null;
      this.isEnabled = false;
    } catch (error) {
      console.error("Failed to disable adblocker:", error);
    }
  }

  public getYTMScripts(): { name: string; script: string }[] {
    return [];
  }
}
