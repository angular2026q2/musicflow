import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const pipe = new DurationPipe();

  describe('track format (default)', () => {
    it('should return "0:00" for zero', () => {
      expect(pipe.transform(0)).toBe('0:00');
    });

    it('should return "0:00" for negative', () => {
      expect(pipe.transform(-10)).toBe('0:00');
    });

    it('should format seconds under a minute', () => {
      expect(pipe.transform(46)).toBe('0:46');
    });

    it('should format minutes and seconds', () => {
      expect(pipe.transform(346)).toBe('5:46');
    });

    it('should format hours, minutes, seconds', () => {
      expect(pipe.transform(3666)).toBe('1:01:06');
    });
  });

  describe('total format', () => {
    it('should return "0 min" for zero', () => {
      expect(pipe.transform(0, 'total')).toBe('0 min');
    });

    it('should format minutes only when under an hour', () => {
      expect(pipe.transform(346, 'total')).toBe('5 min');
    });

    it('should include hours when >= 3600', () => {
      expect(pipe.transform(3666, 'total')).toBe('1h 1 min');
    });
  });
});
