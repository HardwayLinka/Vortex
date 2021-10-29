import ua from 'universal-analytics';

const UA_KEY = 'UA-3620483-23';
const UA_PATH = '';

class Analytics {
  public user: ua.Visitor;

  constructor() {
    // Not used right now
  }

  /**
   * isUserSet returs if the user is set
   */
  public isUserSet(): boolean {
    return !!this.user;
  }

  /**
   * Sets and Initializes the Universal Analytics tracking
   */
  public start(uuidV4: string, updateChannel: string) {
    const keys = ANALYTICS_KEYS[updateChannel] ?? ANALYTICS_KEYS.stable
    if (!this.user && keys) {
      this.user = ua(UA_KEY, uuidV4);
    }
  }

  /**
   * Disable tracking for not logged in user and/or opt-out user
   */
  public stop() {
    this.user = null;
  }

  /**
   * generic event tracking function
   */
  public trackEvent(category: string, action: string, label?: string, value?: number) {

    if (!this.isUserSet()) {
      return;
    }
    this.user.event({
      ec: category,
      ea: action,
      el: label,
      ev: value,
    })
    .send();
  }

  /**
   * Generic click event tracking
   */
  public trackClickEvent(category, label?, value?) {
    this.trackEvent(category, 'Click', label, value);
  }

  /**
   * Tracks the navigation the app, EG: Clicking a menu item on the left
   */
  public trackNavigation(path = 'Missing Path') {
    if (!this.isUserSet()) { return; }
    const newPath = `/${path.split(' ').join('-').toLowerCase()}`;
    this.user.pageview(newPath, UA_PATH).send();
  }
}

const ANALYTICS_KEYS = {
  stable: {
    key: 'UA-3620483-22',
    path: 'https://VortexRelease.com'
  },
  beta: {
    key: '',
    path: ''
  },
  next: {
    key: 'UA-3620483-23',
    path: 'https://VortexCollections.com'
  },
}

const analytics = new Analytics();

export default analytics;
