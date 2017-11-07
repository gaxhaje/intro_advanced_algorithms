package hw5.dijkstra;

import java.io.*;
import java.util.*;


public class Main
{
    final static String fileName = "src/main/resources/sample_file.txt"; //Copied sample file from assignment sheet

    public static void main(String[] args)
    {
        char[][] graphMatrix = inputToMatrix(fileName);
        djikstra(graphMatrix);
    }

    /*
     * Given a completed distMatrix at the end of a Djistra(...) run, builds and
     * outputs desired output
     */
    public static void buildOutput(char[][] graphMatrix, int[][] distMatrix, int gold_x, int gold_y)
    {
        int x = gold_x, y = gold_y;
        String path = "(" + y + ", " + x + ")";
        while(distMatrix[x][y] != 0)
        {
            int min = distMatrix[x][y];
            int min_x = 0, min_y = 0;
            ArrayList<int[]> possibleMoves = getPossibleMovesFromLocation(graphMatrix, x, y);
            for(int[] index : possibleMoves)
            {
                if(distMatrix[index[0]][index[1]] < min){ min_x = index[0]; min_y = index[1]; }
            }

            path = "(" + min_y + ", " + min_x + ") -> " + path;
            x = min_x;
            y = min_y;
            System.out.println(distMatrix[x][y]);
        }

        System.out.println("path length: " + distMatrix[gold_x][gold_y]);
        System.out.println("PATH: " + path);
    }

    public static void djikstra(char[][] graphMatrix)
    {
        boolean goldFound = false;
        TreeSet<String> visited = new TreeSet<String>(); // visited index encoded as "x-y"
        //Create matrix to capture current best distance measures
        int[][] distMatrix = new int[graphMatrix.length][graphMatrix[0].length];
        for(int x = 0; x < distMatrix.length; x++)
            for(int y = 0; y < distMatrix[0].length; y++)
                if(graphMatrix[x][y] == 'K') distMatrix[x][y] = 0;
                else distMatrix[x][y] = Integer.MAX_VALUE;

        while(!goldFound)
        {
            int[] minIndex =  indexOfUnvisitedMin(distMatrix, visited);
            int x = minIndex[0];
            int y = minIndex[1];
            visited.add(x + "-" + y);

            List<int[]> possibleMoves = getPossibleMovesFromLocation(graphMatrix, x, y);
            if(possibleMoves.size() == 0){ System.err.println("No possible moves left. That's an issue." + visited.size()); System.exit(1); }

            for(int[] index : possibleMoves)
            {
                if(!visited.contains(index[0] + "-" + index[1]))distMatrix[index[0]][index[1]] = distMatrix[x][y] + 1;
                if(graphMatrix[index[0]][index[1]] == 'G')
                {
                    goldFound = true;
                    buildOutput(graphMatrix, distMatrix, index[0], index[1]);
                    break;
                }
            }
        }
    }

    /*
     * Returns ArrayList containing indices of all possible moves from the node signified by the provided (x,y) pair
     */
    public static ArrayList<int[]> getPossibleMovesFromLocation(char[][] graphMatrix, int x, int y)
    {
        System.out.println("Possible moves from X:" + x + " and Y: " + y);
        ArrayList<int[]> possibleMoves = new ArrayList<int[]>();

        if (x + 2 < graphMatrix.length)
        {
            if(y + 1 < graphMatrix[0].length)
            {
                if(graphMatrix[x + 2][y + 1] != 'T') possibleMoves.add(new int[]{x+2, y+1});
            }

            if(y - 1 >= 0)
            {
                if(graphMatrix[x + 2][y - 1] != 'T') possibleMoves.add(new int[]{x+2, y-1});
            }
        }

        if (x - 2 >= 0)
        {
            if(y + 1 < graphMatrix[0].length)
            {
                if(graphMatrix[x - 2][y + 1] != 'T') possibleMoves.add(new int[]{x-2, y+1});
            }

            if(y - 1 >= 0)
            {
                if(graphMatrix[x - 2][y - 1] != 'T') possibleMoves.add(new int[]{x-2, y-1});
            }
        }

        if (x - 1 >= 0)
        {
            if(y + 2 < graphMatrix[0].length)
            {
                if(graphMatrix[x - 1][y + 2] != 'T') possibleMoves.add(new int[]{x-1, y+2});
            }

            if(y - 2 >= 0)
            {
                if(graphMatrix[x - 1][y - 2] != 'T') possibleMoves.add(new int[]{x-1, y-2});
            }
        }

        if (x + 1 < graphMatrix.length)
        {
            if(y + 3 < graphMatrix[0].length)
            {
                if(graphMatrix[x + 1][y + 2] != 'T') possibleMoves.add(new int[]{x+1, y+2});
            }

            if(y - 2 >= 0)
            {
                if(graphMatrix[x + 1][y - 2] != 'T') possibleMoves.add(new int[]{x+1, y-2});
            }
        }

        return possibleMoves;
    }

    /**
     * Creates matrix representation of graph from file
     */
    public static char[][] inputToMatrix(String fileName)
    {
        ArrayList<String> file_contents = new ArrayList<String>();
        char[][] graphMatrix = null;
        try
        {
            BufferedReader br = new BufferedReader(new FileReader(fileName));

            String line = br.readLine();
            while (line != null)
            {
                file_contents.add(line);
                line = br.readLine();
            }
            br.close();

            String[] dims = file_contents.get(0).split(" ");
            int x = Integer.parseInt(dims[0]);
            int y = Integer.parseInt(dims[1]);
            graphMatrix = new char[x][];

            for(int temp_x = 1; temp_x < file_contents.size(); temp_x++)
                graphMatrix[temp_x - 1] = file_contents.get(temp_x).toCharArray();

        } catch (Exception e)
        {
            System.err.println("Problem handling file: ");
            e.printStackTrace();
            System.exit(1);
        }

        return graphMatrix;
    }

    /**
     * Returns index of unvisited node with smallest entry in distMatrix
     */
    public static int[] indexOfUnvisitedMin(int[][] distMatrix, TreeSet<String> visited)
    {
        int min = Integer.MAX_VALUE;
        int min_x = 0, min_y = 0;
        for(int x = 0; x < distMatrix.length; x++)
        {
            for(int y= 0; y < distMatrix.length; y++)
            {
                if(!visited.contains(x + "-" + y) && distMatrix[x][y] < min)
                {
                    min_x = x;
                    min_y = y;
                }
            }
        }

        return new int[]{min_x, min_y};
    }
}
