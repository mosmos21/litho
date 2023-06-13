/**
 * 駒
 */
export type Piece = {
  type: PieceType;
  color: PieceColor;
};

/**
 * 駒の種別
 */
export type PieceType = "King" | "Blank";

/**
 * 駒の色
 */
export type PieceColor = "Black" | "White";

/**
 * 石板タイルの種類
 * Omnidirectional: 全方向
 * VerticalAndHorizontal: 縦横
 * Diagonal: 斜め
 */
export type TileType = "Omnidirectional" | "VerticalAndHorizontal" | "Diagonal";

/**
 * プレイヤーが配置可能な石板タイル
 */
export type PlaceableTile = Exclude<TileType, "Omnidirectional">;

/**
 * 石板タイルの枚数
 */
export type TileCount = Record<PlaceableTile, number>;

/**
 * 駒およびタイルの座標
 * 座標の定義は以下の通り
 *
 * - 駒：
 *   - 先手からみた時に左上を座標 Coord { x: 0, y: 0 } とし、右方向にx、下方向にyを増加させる
 * - タイル：
 *   - 全方向のタイルがおかれる座標を Coord { x: 0, y: 0 } とし、右方向にx、下方向にyを増加させる
 *   - つまり、初期状態では 全方向タイルが Coord { x: 0, y: 0 } に、縦横タイルが Coord { x: 0, y: 1 } に配置される
 */
export type Coord = {
  x: number;
  y: number;
};

type Placement = {
  coord: Coord;
};

/**
 * 駒の配置
 */
export type PiecePlacement = {
  piece: Piece;
  coord: Coord;
};

/**
 * 石板タイルの配置
 */
export type TilePlacement = {
  tile: TileType;
  coord: Coord;
};

/**
 * 盤面のマス
 */
export type PieceCell = PiecePlacement | Placement;

/**
 * 石板パネルのマス
 */
export type TileCell = TilePlacement | Placement;

/**
 * 駒を移動するアクション
 */
export type MovePieceAction = {
  type: "MovePiece";
  from: Coord;
  to: Coord;
};

/**
 * 石板タイルを配置するアクション
 */
export type PlaceTileAction = {
  type: "PlaceTile";
  tile: PlaceableTile;
  coord: Coord;
};

/**
 * プレイヤーが行うアクション
 */
export type Action = MovePieceAction | PlaceTileAction;
