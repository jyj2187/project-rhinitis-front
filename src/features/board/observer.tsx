import React, {useEffect, useState} from "react";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";

interface IUseIntersectionObserverProps {
    threshold? : number;
    hasNextPage : boolean | undefined;
    fetchNextPage : () => Promise<InfiniteQueryObserverResult>;
}

export const useIntersectionObserver = ({
    threshold = 0.1,
    hasNextPage,
    fetchNextPage,
} : IUseIntersectionObserverProps) => {

    const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);
    const observerCallback : IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        })
    }

    useEffect(()=> {
        if(!target) return;

        const observer = new IntersectionObserver(observerCallback,{
            threshold,
        })

        observer.observe(target)

        return () => observer.unobserve(target);
    },[observerCallback, threshold, target])

    return {setTarget}

}