import { useEffect, useRef } from 'react';

/**
 * هوك مساعد للتنفيذ على فترات منتظمة
 * @param callback الدالة المراد تنفيذها
 * @param delay الفاصل الزمني بالمللي ثانية (null لإيقاف التنفيذ)
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>(callback);

  // تحديث الدالة المرجعية عند تغيير callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // إعداد الفاصل الزمني
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
