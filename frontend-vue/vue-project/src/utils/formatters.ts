export function parseTime(totalSeconds: number) {
    const hours = Math.floor(totalSeconds/3600)
    const minutes = Math.floor((totalSeconds%3600)/60)
    const seconds = totalSeconds%60

    if(hours > 0) {
        return hours + "h " + minutes + "m " + seconds + "s"
    }
    if(minutes > 0) {
        return minutes + "m " + seconds + "s"
    }
    return seconds + "s"
}


/* ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s */