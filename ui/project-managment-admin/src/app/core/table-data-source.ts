import {MatPaginator, MatSort} from "@angular/material";
/**
 * Data source that accepts a client-side data array and includes native support of filtering,
 * sorting (using MatSort), and pagination (using MatPaginator).
 *
 * Allows for sort customization by overriding sortingDataAccessor, which defines how data
 * properties are accessed. Also allows for filter customization by overriding filterTermAccessor,
 * which defines how row data is converted to a string for filter matching.
 * @template T
 */
import {DataSource} from "@angular/cdk/table";
import {BehaviorSubject, combineLatest, merge, of, Subject, Subscription} from "rxjs";
import {_isNumberValue} from "@angular/cdk/coercion";
import {map} from "rxjs/operators";
import {TableElement} from "angular4-material-table";

const MAX_SAFE_INTEGER = 9007199254740991;

class EditMatDataSource<T> extends DataSource<T> {

  private validatorService;
  private config;
  protected rowsSubject: BehaviorSubject<TableElement<T>[]>;
  datasourceSubject: Subject<T[]>;
  protected dataConstructor: new () => T;
  protected dataKeys: any[];
  protected currentData: any;


  private readonly _data: BehaviorSubject;
  /** Stream emitting render data to the table (depends on ordered data changes). */
  private readonly _renderData;
  /** Stream that emits when a new filter string is set on the data source. */
  private readonly _filter;
  /**
   * Subscription to the changes that should trigger an update to the table's rendered rows, such
   * as filtering, sorting, pagination, or base data changes.
   */
  _renderChangesSubscription: Subscription;
  /**
   * The filtered set of data that has been matched by the filter string, or all the data if there
   * is no filter. Useful for knowing the set of data the table represents.
   * For example, a 'selectAll()' function would likely want to select the set of filtered data
   * shown to the user rather than all the data.
   */
  filteredData: T[];
  /** Array of data that should be rendered by the table, where each object represents one row. */
  data: T[];
  /**
   * Filter term that should be used to filter out objects from the data array. To override how
   * data objects match to this filter string, provide a custom function for filterPredicate.
   */
  filter: string;
  /**
   * Instance of the MatSort directive used by the table to control its sorting. Sort changes
   * emitted by the MatSort will trigger an update to the table's rendered data.
   */
  sort: MatSort | null;
  private _sort;
  /**
   * Instance of the MatPaginator component used by the table to control what page of the data is
   * displayed. Page changes emitted by the MatPaginator will trigger an update to the
   * table's rendered data.
   *
   * Note that the data source uses the paginator's properties to calculate which page of data
   * should be displayed. If the paginator receives its properties as template inputs,
   * e.g. `[pageLength]=100` or `[pageIndex]=1`, then be sure that the paginator's view has been
   * initialized before assigning it to this data source.
   */
  paginator: MatPaginator | null;
  private _paginator;
  /**
   * Data accessor function that is used for accessing data properties for sorting through
   * the default sortData function.
   * This default function assumes that the sort header IDs (which defaults to the column name)
   * matches the data's properties (e.g. column Xyz represents data['Xyz']).
   * May be set to a custom function for different behavior.
   * @param data Data object that is being accessed.
   * @param sortHeaderId The name of the column that represents the data.
   */
  sortingDataAccessor: ((data: T, sortHeaderId: string) => string | number);
  /**
   * Gets a sorted copy of the data array based on the state of the MatSort. Called
   * after changes are made to the filtered data or when sort changes are emitted from MatSort.
   * By default, the function retrieves the active sort and its direction and compares data
   * by retrieving data using the sortingDataAccessor. May be overridden for a custom implementation
   * of data ordering.
   * @param data The array of data that should be sorted.
   * @param sort The connected MatSort that holds the current sort state.
   */
  sortData: ((data: T[], sort: MatSort) => T[]);
  /**
   * @param {?=} initialData
   */

  filterPredicate: ((data: T, filter: string) => boolean);

  constructor(initialData = []) {
    super();
    /**
     * Stream emitting render data to the table (depends on ordered data changes).
     */
    this._renderData = new BehaviorSubject([]);
    /**
     * Stream that emits when a new filter string is set on the data source.
     */
    this._filter = new BehaviorSubject('');
    /**
     * Subscription to the changes that should trigger an update to the table's rendered rows, such
     * as filtering, sorting, pagination, or base data changes.
     */
    this._renderChangesSubscription = Subscription.EMPTY;
    /**
     * Data accessor function that is used for accessing data properties for sorting through
     * the default sortData function.
     * This default function assumes that the sort header IDs (which defaults to the column name)
     * matches the data's properties (e.g. column Xyz represents data['Xyz']).
     * May be set to a custom function for different behavior.
     * @param data Data object that is being accessed.
     * @param sortHeaderId The name of the column that represents the data.
     */
    this.sortingDataAccessor = (data, sortHeaderId) => {
      /** @type {?} */
      const value = (/** @type {?} */ (data))[sortHeaderId];
      if (_isNumberValue(value)) {
        /** @type {?} */
        const numberValue = Number(value);
        // Numbers beyond `MAX_SAFE_INTEGER` can't be compared reliably so we
        // leave them as strings. For more info: https://goo.gl/y5vbSg
        return numberValue < MAX_SAFE_INTEGER ? numberValue : value;
      }
      return value;
    };
    /**
     * Gets a sorted copy of the data array based on the state of the MatSort. Called
     * after changes are made to the filtered data or when sort changes are emitted from MatSort.
     * By default, the function retrieves the active sort and its direction and compares data
     * by retrieving data using the sortingDataAccessor. May be overridden for a custom implementation
     * of data ordering.
     * @param data The array of data that should be sorted.
     * @param sort The connected MatSort that holds the current sort state.
     */
    this.sortData = (data, sort) => {
      /** @type {?} */
      const active = sort.active;
      /** @type {?} */
      const direction = sort.direction;
      if (!active || direction == '') {
        return data;
      }
      return data.sort((a, b) => {
        /** @type {?} */
        let valueA = this.sortingDataAccessor(a, active);
        /** @type {?} */
        let valueB = this.sortingDataAccessor(b, active);
        /** @type {?} */
        let comparatorResult = 0;
        if (valueA != null && valueB != null) {
          // Check if one value is greater than the other; if equal, comparatorResult should remain 0.
          if (valueA > valueB) {
            comparatorResult = 1;
          }
          else if (valueA < valueB) {
            comparatorResult = -1;
          }
        }
        else if (valueA != null) {
          comparatorResult = 1;
        }
        else if (valueB != null) {
          comparatorResult = -1;
        }
        return comparatorResult * (direction == 'asc' ? 1 : -1);
      });
    };
    /**
     * Checks if a data object matches the data source's filter string. By default, each data object
     * is converted to a string of its properties and returns true if the filter has
     * at least one occurrence in that string. By default, the filter string has its whitespace
     * trimmed and the match is case-insensitive. May be overridden for a custom implementation of
     * filter matching.
     * @param data Data object used to check against the filter.
     * @param filter Filter string that has been set on the data source.
     * @return Whether the filter matches against the data
     */
    this.filterPredicate = (data, filter) => {
      /** @type {?} */
      const accumulator = (currentTerm, key) => currentTerm + (/** @type {?} */ (data))[key];
      /** @type {?} */
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      /** @type {?} */
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) != -1;
    };
    this._data = new BehaviorSubject(initialData);
    this._updateChangeSubscription();
  }

  /**
   * Array of data that should be rendered by the table, where each object represents one row.
   * @return {?}
   */
  get data() {
    return this._data.value;
  }

  /**
   * @param {?} data
   * @return {?}
   */
  set data(data) {
    this._data.next(data);
  }

  /**
   * Filter term that should be used to filter out objects from the data array. To override how
   * data objects match to this filter string, provide a custom function for filterPredicate.
   * @return {?}
   */
  get filter() {
    return this._filter.value;
  }

  /**
   * @param {?} filter
   * @return {?}
   */
  set filter(filter) {
    this._filter.next(filter);
  }

  /**
   * Instance of the MatSort directive used by the table to control its sorting. Sort changes
   * emitted by the MatSort will trigger an update to the table's rendered data.
   * @return {?}
   */
  get sort() {
    return this._sort;
  }

  /**
   * @param {?} sort
   * @return {?}
   */
  set sort(sort) {
    this._sort = sort;
    this._updateChangeSubscription();
  }

  /**
   * Instance of the MatPaginator component used by the table to control what page of the data is
   * displayed. Page changes emitted by the MatPaginator will trigger an update to the
   * table's rendered data.
   *
   * Note that the data source uses the paginator's properties to calculate which page of data
   * should be displayed. If the paginator receives its properties as template inputs,
   * e.g. `[pageLength]=100` or `[pageIndex]=1`, then be sure that the paginator's view has been
   * initialized before assigning it to this data source.
   * @return {?}
   */
  get paginator() {
    return this._paginator;
  }

  /**
   * @param {?} paginator
   * @return {?}
   */
  set paginator(paginator) {
    this._paginator = paginator;
    this._updateChangeSubscription();
  }

  /**
   * Subscribe to changes that should trigger an update to the table's rendered rows. When the
   * changes occur, process the current state of the filter, sort, and pagination along with
   * the provided base data and send it to the table for rendering.
   * @return {?}
   */
  _updateChangeSubscription() {
    /** @type {?} */
    const sortChange = this._sort ?
      merge(this._sort.sortChange, this._sort.initialized) :
      of(null);
    /** @type {?} */
    const pageChange = this._paginator ?
      merge(this._paginator.page, this._paginator.initialized) :
      of(null);
    /** @type {?} */
    const dataStream = this._data;
    /** @type {?} */
    const filteredData = combineLatest(dataStream, this._filter)
      .pipe(map(([data]) => this._filterData(data)));
    /** @type {?} */
    const orderedData = combineLatest(filteredData, sortChange)
      .pipe(map(([data]) => this._orderData(data)));
    /** @type {?} */
    const paginatedData = combineLatest(orderedData, pageChange)
      .pipe(map(([data]) => this._pageData(data)));
    // Watched for paged data changes and send the result to the table to render.
    this._renderChangesSubscription.unsubscribe();
    this._renderChangesSubscription = paginatedData.subscribe(data => this._renderData.next(data));
  }

  /**
   * Returns a filtered data array where each filter object contains the filter string within
   * the result of the filterTermAccessor function. If no filter is set, returns the data array
   * as provided.
   * @param {?} data
   * @return {?}
   */
  _filterData(data) {
    // If there is a filter string, filter out data that does not contain it.
    // Each data object is converted to a string using the function defined by filterTermAccessor.
    // May be overridden for customization.
    this.filteredData =
      !this.filter ? data : data.filter(obj => this.filterPredicate(obj, this.filter));
    if (this.paginator) {
      this._updatePaginator(this.filteredData.length);
    }
    return this.filteredData;
  }

  /**
   * Returns a sorted copy of the data if MatSort has a sort applied, otherwise just returns the
   * data array as provided. Uses the default data accessor for data lookup, unless a
   * sortDataAccessor function is defined.
   * @param {?} data
   * @return {?}
   */
  _orderData(data) {
    // If there is no active sort or direction, return the data without trying to sort.
    if (!this.sort) {
      return data;
    }
    return this.sortData(data.slice(), this.sort);
  }

  /**
   * Returns a paged splice of the provided data array according to the provided MatPaginator's page
   * index and length. If there is no paginator provided, returns the data array as provided.
   * @param {?} data
   * @return {?}
   */
  _pageData(data) {
    if (!this.paginator) {
      return data;
    }
    /** @type {?} */
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.slice().splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Updates the paginator to reflect the length of the filtered data, and makes sure that the page
   * index does not exceed the paginator's last page. Values are changed in a resolved promise to
   * guard against making property changes within a round of change detection.
   * @param {?} filteredDataLength
   * @return {?}
   */
  _updatePaginator(filteredDataLength) {
    Promise.resolve().then(() => {
      if (!this.paginator) {
        return;
      }
      this.paginator.length = filteredDataLength;
      // If the page index is set beyond the page, reduce it to the last page.
      if (this.paginator.pageIndex > 0) {
        /** @type {?} */
        const lastPageIndex = Math.ceil(this.paginator.length / this.paginator.pageSize) - 1 || 0;
        this.paginator.pageIndex = Math.min(this.paginator.pageIndex, lastPageIndex);
      }
    });
  }

  update(data: T[]) {
    this._data.next(data)
  }

  /**
   * Used by the MatTable. Called when it connects to the data source.
   * \@docs-private
   * @return {?}
   */
  connect() {
    return this._renderData;
  }

  /**
   * Used by the MatTable. Called when it is destroyed. No-op.
   * \@docs-private
   * @return {?}
   */
  disconnect() {
  }
}
