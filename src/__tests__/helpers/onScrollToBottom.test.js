import onScrollToBottom from '../../helpers/onScrollToBottom';

describe('ScrollToBottom', () => {
  const { window, document } = global;
  const callBack = jest.fn();

  beforeAll(() => {
    window.innerHeight = 0;
    document.documentElement.scrollTo = 0;
  });

  it('calls a function once the scroll reaches the bottom end', () => {
    onScrollToBottom(callBack);
    expect(callBack).toHaveBeenCalled();
  });
});
