import Command from './Command';

export interface Setter<T> {
    (value : T) : any;
}

/**
 * Create a command that can be used to set and unset a value.
 * Example Use:
 * pushCommand(setter(newName, player.name, (name) => player.name = name));
 *
 * @param newValue The value that is being set.
 * @param oldValue The value that was set.
 * @param setter A function that will take a value and set a value.
 * @param id An optional id used to merge related commands.
 */
export function setter<T>(newValue : T, oldValue : T, setter : Setter<T>, id? : symbol) : Command {
    return new SetterCommand(setter, newValue, oldValue, id);
}

class SetterCommand<T> implements Command {
    private setter : Setter<T>;
    private newValue : T;
    private oldValue : T;
    id : symbol;

    constructor(setter : Setter<T>, newValue : T, oldValue : T, id? : symbol) {
        this.setter = setter;
        this.newValue = newValue;
        this.oldValue = oldValue;
        this.id = id || null;
    }

    execute() {
        this.setter(this.newValue);
    }

    undo() {
        this.setter(this.oldValue);
    }
}
