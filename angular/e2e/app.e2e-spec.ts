import { CelesteTemplatePage } from './app.po';

describe('Celeste App', function() {
  let page: CelesteTemplatePage;

  beforeEach(() => {
    page = new CelesteTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
