import calcHash from 'object-hash';


export interface SmsNotification {
    threadid: String
    type: String
    read: Boolean
    number: String
    received: String
    body: String
    _id: String
}

export interface Transaction {
    date: Date
    account: String
    payee: String
    notes: String
    category: String
    amount: Number
}


function *pairwise<T>(iterable: Iterable<T>): Generator<[T, T]> {
    // Yield pairs of elements from an iterable.
    let prev = null;
    
}


function findOldestUnsyncedNotification(
    notifications: Array<SmsNotification>,
    latestTransaction: Transaction,
): SmsNotification | null {
    for (let notification of notifications) {
        if (notification.received < latestTransaction.date.toISOString()) {
            return notification;
        }
    }
    return null;
}


function transactionFromNotification(
    notification: SmsNotification,
    rules: Array<(notification: SmsNotification) => Transaction>, 
): Transaction | null {
    for (let rule of rules) {
        try {
            if (!rule(notification)) continue;
            return rule(notification)
        } catch (e) {
            continue
        }
    }
    return null;
}
