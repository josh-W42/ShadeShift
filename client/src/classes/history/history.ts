/**
 * The history static class is used for holding the url sequences the user creates and
 * enabling the "undo", "redo" features a user could use.
 *
 * At the current point in time, this is used for palette history but can be expanded to other similar features if
 * the methods and variables have their static status removed. Just be sure to store the instances in some place safe. (like a context I'm thinking)
 */
export class History {
  private static inStack: string[] = [];
  private static outStack: string[] = [];
  private static limit = 50;

  /**
   * Moves the current sequence backward in the history stack.
   * This is typically used for undoing an action the user has done.
   *
   * @param currentSequence The current sequence to push onto the redo stack.
   * @returns The sequence that was previously at the top of the undo stack.
   */
  public static goBack(currentSequence: string) {
    this.outStack.push(currentSequence);
    return this.inStack.pop()!;
  }

  /**
   * Moves the current sequence forward in the history stack.
   * This is typically used for redoing an action the user has undone.
   *
   * @param currentSequence The current sequence to push onto the undo stack.
   * @returns The next sequence from the redo stack (outStack), if available.
   */
  public static goForward(currentSequence: string) {
    this.inStack.push(currentSequence);
    return this.outStack.pop()!;
  }

  /**
   * Saves the current sequence so that a user can return to it later, using the "undo" feature.
   *
   * @param currentSequence The current sequence to save.
   */
  public static save(currentSequence: string) {
    if (this.inStack.length + this.outStack.length == this.limit) {
      this.inStack.splice(0, 1);
    }

    this.inStack.push(currentSequence);
  }

  /**
   * Checks if there is a sequence available to undo.
   *
   * @returns True if the undo stack (inStack) is not empty, false otherwise.
   */
  public static canGoBack() {
    return this.inStack.length > 0;
  }

  /**
   * Checks if there is a sequence available to redo.
   *
   * @returns True if the redo stack (outStack) is not empty, false otherwise.
   */
  public static canGoForward() {
    return this.outStack.length > 0;
  }

  /**
   * Resets the redo stack. This is called after a user goes back, and then makes a new sequence
   * so that they can't redo back to the old sequences.
   */
  public static emptyRedo() {
    this.outStack = [];
  }

  /**
   * Empties both the undo and redo stacks.
   */
  public static empty() {
    this.outStack = [];
    this.inStack = [];
  }
}
