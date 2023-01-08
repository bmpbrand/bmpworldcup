import { ComponentPropsWithoutRef, forwardRef } from "react";

export const Audio = forwardRef<
   HTMLAudioElement,
   ComponentPropsWithoutRef<"audio">
>((_, ref) => {
   return <audio src="audio.mp3" autoPlay={false} ref={ref} />;
});
