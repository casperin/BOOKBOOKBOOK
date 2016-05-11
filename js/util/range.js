export default function* range (start = Infinity, stop, step = 1) {
    if (arguments.length < 2) {
        stop = start;
        start = 0;
    }

    while (step < 0 ? start > stop : start < stop) {
        yield start;
        start += step;
    }
};

