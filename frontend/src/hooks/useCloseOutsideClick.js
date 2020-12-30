import { useEffect } from 'react';

export const useCloseOutsideClick = (dialogRef, changeState, refs) => {
    const listener = (e) => {
        if (!dialogRef || !dialogRef.current || dialogRef.current.contains(e.target) || (refs && refs.includes(e.target))) {
            return;
        }
        changeState(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
        };
    });
};
